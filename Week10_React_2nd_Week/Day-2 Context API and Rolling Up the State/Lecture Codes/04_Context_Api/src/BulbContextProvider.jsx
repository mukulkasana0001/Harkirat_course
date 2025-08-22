// Import required functions from React
import { createContext, useState } from "react";

// Create a Context object for the Bulb state
const BulbContext = createContext();

// Define the context provider component
function BulbContextProvider({ children }) {
    
    // Create a state variable `bulbOn` with default value `true` and its setter `setBulbOn`
    const [bulbOn, setBulbOn] = useState(true);

    return (
        // Use the Context Provider to make `bulbOn` and `setBulbOn` accessible to child components
        <BulbContext.Provider
            value={{
                bulbOn, // Current state of the bulb (on/off)
                setBulbOn, // Function to update the state of the bulb
            }}
        >
            {children} {/* Render child components */}
        </BulbContext.Provider>
    );
}

// Export the Context Provider and the Context object for use in other components
export { BulbContextProvider, BulbContext };





// ### Jargon

// - **Context**: This is created using `React.createContext()`. It serves as a container for the data you want to share.

// - **Provider**: This component wraps part of your application and provides the context value to all its descendants. Any component that is a child of this Provider can access the context.

// - **Consumer**: This component subscribes to context changes. It allows you to access the context value (using `useContext`  hook)