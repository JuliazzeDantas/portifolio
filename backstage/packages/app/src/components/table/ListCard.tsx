import './styles/list-card.css';

export type ListCardProps = {
    title?: string;
    system?: string;
    tags?: string[];
    third?: React.ReactNode;
    onClick?: () => void;
};

export const ListCard: React.FC<ListCardProps> = ({ title, system, third, tags, onClick }) => (
    <div>
        <button className="card-skill" onClick={onClick}>
            <p className="card-skill-name">{title}</p>
            <p className="card-skill-system">{system}</p>
            <div className="card-skill-description">{third}</div>
            <div className="card-skill-tags">
                {tags?.map((tag) => <span className="card-skill-tag" key={tag}>{tag}</span>)}
            </div>
        </button>
    </div>
);
