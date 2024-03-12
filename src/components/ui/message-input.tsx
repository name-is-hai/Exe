const MessageInputError = ({ message }: { message: string | undefined }) => {
  if (!message) return null;

  return <p className="text-xs text-red-500">{message}</p>;
};

export default MessageInputError;
