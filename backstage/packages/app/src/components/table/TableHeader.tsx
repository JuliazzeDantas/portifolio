import './styles/table-header.css';

export type HeadLabels = {
    name: string;
    system: string;
    third: string;
    tags: string;
};

export const TableHeader: React.FC<{ labels: HeadLabels }> = ({ labels }) => (
    <div className="table-header">
        <div className="column-head-table skill-head-name"><p>{labels.name}</p></div>
        <div className="column-head-table skill-head-system"><p>{labels.system}</p></div>
        <div className="column-head-table skill-head-description"><p>{labels.third}</p></div>
        <div className="column-head-table skill-head-tag"><p>{labels.tags}</p></div>
    </div>
);
