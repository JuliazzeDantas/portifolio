import {DefaultPage} from '../../components/core/DefaultPage';
import { QuestList } from "./QuestGenerator";

export const QuestPage: React.FC = () => {
    return (
        <DefaultPage titleHeader="Quests">
            <div className="quest-container">
                <QuestList />
            </div>
        </DefaultPage>
    );
}