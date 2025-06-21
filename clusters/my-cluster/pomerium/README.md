# What is Pomerium

# How to run it here

* kubectl apply -k github.com/pomerium/pomerium/k8s/zero\?ref=main
* kubectl apply -f /root/repos/Estudos/Kubernetes/kube-config/clusters/my-cluster/pomerium/service.yaml
* kubectl get svc/pomerium-proxy -n pomerium-zero -o=jsonpath='{.status.loadBalancer.ingress[0].ip}'