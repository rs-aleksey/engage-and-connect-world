
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function RightSidebar() {
  const contacts = [
    { id: 1, name: "Jane Cooper", avatar: "/placeholder.svg", online: true },
    { id: 2, name: "Robert Fox", avatar: "/placeholder.svg", online: true },
    { id: 3, name: "Wade Warren", avatar: "/placeholder.svg", online: false },
    { id: 4, name: "Esther Howard", avatar: "/placeholder.svg", online: true },
    { id: 5, name: "Leslie Alexander", avatar: "/placeholder.svg", online: false },
    { id: 6, name: "Dianne Russell", avatar: "/placeholder.svg", online: true },
  ];

  return (
    <aside className="sticky top-14 h-[calc(100vh-3.5rem)] w-[280px] hidden lg:block p-4 overflow-y-auto">
      <div>
        <h3 className="text-lg font-semibold mb-3 px-2">Contacts</h3>
        <div className="space-y-1">
          {contacts.map((contact) => (
            <Button 
              key={contact.id} 
              variant="ghost" 
              className="w-full justify-start font-normal relative"
            >
              <div className="flex items-center w-full">
                <Avatar className="h-9 w-9 mr-3">
                  <AvatarImage src={contact.avatar} alt={contact.name} />
                  <AvatarFallback>{contact.name[0]}</AvatarFallback>
                </Avatar>
                <span>{contact.name}</span>
                {contact.online && (
                  <span className="absolute bottom-0.5 left-7 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3 px-2">Group conversations</h3>
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            className="w-full justify-start font-normal"
          >
            <div className="flex items-center">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src="/placeholder.svg" alt="New Group" />
                <AvatarFallback>+</AvatarFallback>
              </Avatar>
              <span>Create New Group</span>
            </div>
          </Button>
        </div>
      </div>
    </aside>
  );
}
