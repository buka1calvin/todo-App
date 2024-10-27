import { CiCircleRemove } from "react-icons/ci";

interface ChipProps {
  label: string;      // Change to accept label
  onRemove: () => void; 
  selected?: boolean; // Add selected prop
}

const Chip: React.FC<ChipProps> = ({ label, onRemove, selected }) => (
  <div className={`inline-flex items-center border-2 ${selected ? 'bg-green-100 border-green-300' : 'bg-purple-100 border-purple-300'} text-xs font-bold text-purple-500 rounded-full px-3 py-1 m-1`}>
    <span>{label}</span>
    <button onClick={onRemove} className="ml-2 focus:outline-none">
      <CiCircleRemove className="text-base" />
    </button>
  </div>
);

export default Chip;
