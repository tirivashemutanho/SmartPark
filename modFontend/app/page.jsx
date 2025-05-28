import LogInModal from "@/components/authPage";

export const dynamic = 'force-dynamic'; // Force dynamic rendering

const Home = () => {
  return ( 
    <div>
      <LogInModal />
    </div>
   );
}
 
export default Home;