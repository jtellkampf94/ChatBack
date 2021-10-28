import { useGetConversationsQuery } from "../generated/graphql";

const Conversations: React.FC = () => {
  const { loading, error, data } = useGetConversationsQuery();

  if (data) {
    return (
      <div>
        {data.getConversations.map((conversation) => (
          <div key={conversation.id}>Conversation id: #{conversation.id}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Conversations</h1>
    </div>
  );
};

export default Conversations;
