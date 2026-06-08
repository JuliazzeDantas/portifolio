import { AttributeTypeMenu } from './AttributeTypeMenu';

export const AttributeColumn = () => {
    return(
        <>
            <div className="attribute-body">
              <AttributeTypeMenu title="Languages" items={['Python', 'Java', 'TypeScript']} />
              <AttributeTypeMenu title="Front-end" items={['React']} />
              <AttributeTypeMenu title="Back-end" items={['Node.js', 'FastAPI']} />
              <AttributeTypeMenu title="DevOps" items={['Kubernetes', 'Docker', 'Azure', 'CI/CD (GitHub Actions)', 'Grafana/Prometheus']} />
            </div>
        </>
    )
}