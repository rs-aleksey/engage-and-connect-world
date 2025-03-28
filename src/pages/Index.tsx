
import { Header } from "@/components/layout/Header";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { NewsFeed } from "@/components/NewsFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-facebook-light">
      <Header />
      <div className="pt-14 flex">
        <LeftSidebar />
        <div className="flex-1">
          <NewsFeed />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Index;
