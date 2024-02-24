import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { UserData } from '../data';


interface ChatTopbarProps {
  selectedUser: UserData;
}

export default function ChatTopbar({ selectedUser }: Readonly<ChatTopbarProps>) {
  return (
    <div className="flex items-center justify-between w-full h-20 p-4 border-b">
      <div className="flex items-center gap-2">
        <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser.avatar}
            alt={selectedUser.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium">{selectedUser.name}</span>
        </div>
      </div>
    </div>
  )
}
