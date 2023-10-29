import PostCreate from "./PostCreate";
import PostList from "./PostList";

const App = () => {
  return (
    <>
      <PostCreate />
      <hr />

      <h1>Posts</h1>
      <PostList />
    </>
  );
};

export default App;
