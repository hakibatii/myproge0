import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from "./components/ThemeProvider";
import { View } from 'react-native';

// استيراد الشاشات
import FeedbackScreen from './FeedbackScreen';
import Home from "./pages/Home";
import Cities from "./pages/Cities";
import Account from "./pages/Account";
import Map from "./pages/Map";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyPhone from "./pages/VerifyPhone";
import ProfileEdit from "./pages/ProfileEdit";
import UserProfile from "./pages/UserProfile";
import DescriptionEdit from "./pages/DescriptionEdit";
import CreatePost from "./pages/CreatePost";
import CreateStory from "./pages/CreateStory";
import CreateTrip from "./pages/CreateTrip";
import CommentsPage from "./pages/CommentsPage";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
import BlockedUsers from "./pages/BlockedUsers";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import GroupMembers from "./pages/GroupMembers";
import BrowseHistory from "./pages/BrowseHistory";
import Favorites from "./pages/Favorites";
import UpgradeForm from "./pages/UpgradeForm";
import LanguagePage from "./pages/LanguagePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import AccountType from "./pages/AccountType";

import CaptureIDPhoto from "./pages/upgrade/CaptureIDPhoto";
import UpgradeStep2 from "./pages/upgrade/UpgradeStep2";
import UpgradeStep3 from "./pages/upgrade/UpgradeStep3";

import ImagePickerExample from './pages/ImagePickerExample'; // تم التعديل هنا
import OfflineNotice from './components/OfflineNotice';
import NavBar from './components/NavBar'; // تأكد أن هذا موجود

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider defaultTheme="light" storageKey="morocco-theme">
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="Index">
              <Stack.Screen name="Index" component={Index} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Cities" component={Cities} />
              <Stack.Screen name="Account" component={Account} />
              <Stack.Screen name="AccountType" component={AccountType} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
              <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
              <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
              <Stack.Screen name="DescriptionEdit" component={DescriptionEdit} />
              <Stack.Screen name="UserProfile" component={UserProfile} />
              <Stack.Screen name="CreatePost" component={CreatePost} />
              <Stack.Screen name="CreateStory" component={CreateStory} />
              <Stack.Screen name="CreateTrip" component={CreateTrip} />
              <Stack.Screen name="CommentsPage" component={CommentsPage} />
              <Stack.Screen name="Followers" component={Followers} />
              <Stack.Screen name="Following" component={Following} />
              <Stack.Screen name="BlockedUsers" component={BlockedUsers} />
              <Stack.Screen name="Chat" component={Chat} />
              <Stack.Screen name="ChatList" component={ChatList} />
              <Stack.Screen name="GroupMembers" component={GroupMembers} />
              <Stack.Screen name="BrowseHistory" component={BrowseHistory} />
              <Stack.Screen name="Favorites" component={Favorites} />
              <Stack.Screen name="UpgradeForm" component={UpgradeForm} />
              <Stack.Screen name="CaptureIDPhoto" component={CaptureIDPhoto} />
              <Stack.Screen name="UpgradeStep2" component={UpgradeStep2} />
              <Stack.Screen name="UpgradeStep3" component={UpgradeStep3} />
              <Stack.Screen name="LanguagePage" component={LanguagePage} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="NotFound" component={NotFound} />
              <Stack.Screen name="ImagePickerExample" component={ImagePickerExample} /> {/* تمت إضافتها */}
            </Stack.Navigator>
            <NavBar />
            <OfflineNotice />
          </View>
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;