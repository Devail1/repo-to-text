import RepoForm from './components/RepoForm';

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Repo to Text</h1>
      <RepoForm />
    </div>
  );
};

export default Home;
