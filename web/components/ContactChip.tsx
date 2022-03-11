import { Avatar, Chip } from "@material-ui/core";

interface ContactChipProps {
  onDelete: () => void;
  name: string;
  profilePictureUrl?: string;
}

const ContactChip: React.FC<ContactChipProps> = ({
  onDelete,
  name,
  profilePictureUrl,
}) => {
  return (
    <Chip
      label={name}
      onDelete={onDelete}
      avatar={<Avatar src={profilePictureUrl}></Avatar>}
    />
  );
};

export default ContactChip;
