// Sample Home Screen
const HomeScreen = ({ navigation }: any) => {
  const dispatch = store.dispatch;

  // Function to handle the "Show Tasks" button press
  const handleShowTasks = () => {
    dispatch(fetchTasks());
    // Show tasks in some other way
    console.log('Showing tasks...');
  };
}; 