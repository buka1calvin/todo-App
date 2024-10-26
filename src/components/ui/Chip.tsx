import { CiCircleRemove } from "react-icons/ci";
interface ChipProps {
    label: string;
    onRemove: () => void;
}

const Chip: React.FC<ChipProps> = ({ label, onRemove }) => (
    <div className="inline-flex items-center border-2 bg-purple-100 text-xs font-bold border-purple-300 text-purple-500 rounded-full px-3 py-1 m-1">
        <span>{label}</span>
        <button
            onClick={onRemove}
            className="ml-2 focus:outline-none"
        >
            <CiCircleRemove className="text-base"/>
        </button>
    </div>
);
export default Chip;