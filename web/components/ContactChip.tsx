import { Avatar, Chip } from "@material-ui/core";

interface ContactChipProps {
  onDelete: () => void;
  name: string;
}

const ContactChip: React.FC<ContactChipProps> = ({ onDelete, name }) => {
  return <Chip label={name} onDelete={onDelete} avatar={<Avatar></Avatar>} />;
};

export default ContactChip;
