import HomeScreen from "./src/screens/HomeScreen";
import QueryClientProvider from "./src/QueryClientProvider";

export default function App() {
  return (
    <QueryClientProvider>
      <HomeScreen/>
    </QueryClientProvider>
  );
}
