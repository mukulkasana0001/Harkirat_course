// Importing useState hook from React for state management
import { useState } from "react"; 

// Importing the PostComponent from a local file
import { PostComponent } from "./Post"; 

// Main App component declaration
function App() { 
  // Initializing 'posts' state as an empty array and providing 'setPosts' to update it
  const [posts, setPosts] = useState([]); 
  const [posttime, setPosttime] = useState(0);   // *****someextra for time 

  // Mapping over 'posts' array to render each post as a PostComponent
  const postComponents = posts.map(post => 
    <PostComponent 
      // Passing 'name' prop to PostComponent
      name={post.name} 
      // Passing 'subtitle' prop to PostComponent
      subtitle={post.subtitle} 
      // Passing 'time' prop to PostComponent (minor typo: should be post.time instead of post.title)
      time={post.time} 
      // Passing 'image' prop to PostComponent
      image={post.image} 
      // Passing 'description' prop to PostComponent
      description={post.description} 

    />
  )

  // Function to add a new post to the 'posts' state
  function addPost() { 
    // Using spread operator to add a new post while retaining existing posts
    setPosts([...posts, { 
      // Name of the user for the new post
      name: "mukul kasana", 
      // Subtitle for the new post
      subtitle: "2000 followers", 
      // Time for the new post
      time: posttime +"m ago",    // *****someextra for time 
      // Image URL for the new post
      image: "https://image5.sixthtone.com/image/5/85/865.jpg", 
      // Description for the new post
      description: "Heyy Everyone!" 
    }])
    setPosttime(c=>c+1)  // *****someextra for time 
  }

  // JSX to render the App component UI
  return ( 
    // Styling the main container
    <div style={{background: "#dfe6e9", height: "100vh", }}> 
      {/* Button to add a new post on click */}
      <button onClick={addPost}>Add post</button> 
      {/* Flex container to center the content */}
      <div style={{display: "flex", justifyContent: "center" }}> 
        {/* Container for the list of posts */}
        <div> 
          {/* Rendering the list of PostComponents */}
          {postComponents} 
        </div>
      </div>
    </div>
  )
}

// Exporting App component as the default export
export default App;
