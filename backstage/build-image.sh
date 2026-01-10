#!/bin/bash
# Run me using the command: bash build-image.sh
# Script to build the Backstage Docker image and load it into Kind

set -e

# Variables
IMAGE_NAME="backstage"
IMAGE_TAG="1.0.0"
KIND_CLUSTER_NAME="kind-cluster"
K8S_BASE_PATH="../kubernetes/bacsktage"

echo "======================================================"
echo "Checking Kubernetes cluster..."
echo "======================================================"

# Check if we're in the correct Kind cluster
CURRENT_CONTEXT=$(kubectl config current-context 2>/dev/null || echo "none")
EXPECTED_CONTEXT="kind-${KIND_CLUSTER_NAME}"

if [ "$CURRENT_CONTEXT" != "$EXPECTED_CONTEXT" ]; then
    echo ""
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║                                                                ║"
    echo "║         ⚠️  ERROR: WRONG KUBERNETES CLUSTER! ⚠️                ║"
    echo "║                                                                ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo ""
    echo "Current cluster: $CURRENT_CONTEXT"
    echo "Expected cluster: $EXPECTED_CONTEXT"
    echo ""
    echo "To switch to the correct cluster, run:"
    echo "  kubectl config use-context $EXPECTED_CONTEXT"
    echo ""
    exit 1
fi

echo "✓ Correct cluster: $CURRENT_CONTEXT"
echo ""

echo "======================================================"
echo "Checking Kubernetes resources..."
echo "======================================================"

# Check if namespace exists
if kubectl get namespace backstage &> /dev/null; then
    echo "✓ Namespace 'backstage' already exists"
else
    echo "✗ Namespace 'backstage' does not exist. Applying resources..."
    
    # Apply namespace first
    echo "  → Applying namespace..."
    kubectl apply -f ${K8S_BASE_PATH}/namespace.yaml
    
    # Apply secrets
    echo "  → Applying secrets..."
    kubectl apply -f ${K8S_BASE_PATH}/secrets/postgres-secret.yaml
    kubectl apply -f ${K8S_BASE_PATH}/secrets/backstage-secret.yaml
    
    # Apply volumes
    echo "  → Applying volumes..."
    kubectl apply -f ${K8S_BASE_PATH}/volume/postgres-storage.yaml
    
    # Apply deployments
    echo "  → Applying deployments..."
    kubectl apply -f ${K8S_BASE_PATH}/deployment/postgres-deployment.yaml
    
    # Apply services
    echo "  → Applying services..."
    kubectl apply -f ${K8S_BASE_PATH}/postgres-service.yaml
    
    echo "✓ Kubernetes resources applied successfully!"
    echo ""
    echo "⏳ Waiting 10 seconds for PostgreSQL to initialize..."
    sleep 10
fi

echo "======================================================"
echo "======================================================"
echo "Building Backstage Docker image..."
echo "======================================================"

# Build the image
docker build -t ${IMAGE_NAME}:${IMAGE_TAG} -f ./packages/backend/Dockerfile .

echo "✓ Image built successfully: ${IMAGE_NAME}:${IMAGE_TAG}"

echo "======================================================"
echo "Loading image into Kind cluster..."
echo "======================================================"
kind load docker-image ${IMAGE_NAME}:${IMAGE_TAG} --name ${KIND_CLUSTER_NAME}

echo "✓ Image loaded into Kind cluster successfully!"
echo "======================================================"

# Check if Backstage deployment already exists
if kubectl get deployment backstage -n backstage &> /dev/null; then
    echo "✓ Deployment 'backstage' already exists. Restarting pods..."
    kubectl delete pod -l app=backstage -n backstage
else
    echo "✗ Deployment 'backstage' does not exist. Applying..."
    kubectl apply -f ${K8S_BASE_PATH}/deployment/backstage-deployment.yaml
    echo "✓ Deployment applied successfully!"
fi

echo ""
echo "======================================================"
echo "✓ Process completed!"
echo "======================================================"
echo ""
echo "To access the application, run:"
echo "  kubectl port-forward -n backstage svc/backstage 7007:7007"
echo ""
echo "Then access: http://localhost:7007"
