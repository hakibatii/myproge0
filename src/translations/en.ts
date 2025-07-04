
import { TranslationKeys } from "./types";

const en: Partial<TranslationKeys> = {
  // App-wide
  welcomeBack: "Welcome Back",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm Password",
  login: "Login",
  logout: "Logout",
  signup: "Sign Up",
  forgotPassword: "Forgot Password",
  resetPassword: "Reset Password",
  verifyEmail: "Verify Email",
  resendCode: "Resend Code",
  verifyPhone: "Verify Phone",
  sendCode: "Send Code",
  continueToApp: "Continue to App",
  back: "Back",
  next: "Next",
  submit: "Submit",
  cancel: "Cancel",
  delete: "Delete",
  save: "Save",
  edit: "Edit",
  invalid: "Invalid",
  validationError: "Please check your inputs and try again",
  loading: "Loading...",
  moreInfo: "More Info",
  createAccount: "Create an Account",
  chooseLanguage: "Choose Language",
  search: "Search",
  notifications: "Notifications",
  settings: "Settings",
  account: "Account",
  profile: "Profile",
  editProfile: "Edit Profile",
  darkMode: "Dark Mode",
  lightMode: "Light Mode",
  logoutConfirm: "Are you sure you want to log out?",
  yes: "Yes",
  no: "No",
  notificationsEmpty: "No notifications yet",
  error: "Error",
  retry: "Retry",
  securitySettings: "Security Settings",
  termsAndConditions: "Terms and Conditions",
  privacyPolicy: "Privacy Policy",
  
  // New Auth translations
  fullName: "Full Name",
  phoneNumber: "Phone Number",
  or_continue_with: "Or continue with",
  already_have_account: "Already have an account?",
  select_google_account: "Select Google Account",
  select_apple_account: "Select Apple Account",
  select_account_to_continue: "Select an account to continue",
  privacy_notice: "By continuing, you agree to our Privacy Policy and Terms of Service",
  password_length_error: "Password must be at least 6 characters",
  verification_code_sent: "Verification code sent",
  check_email: "Check your email",
  code_sent_to: "Code sent to",
  error_network: "Network error",
  offline: "You're offline, please check your connection",

  // Home Screen
  exploreTrips: "Explore Trips",
  viewAll: "View All",
  featuredTrips: "Featured Trips",
  popularDestinations: "Popular Destinations",
  trending: "Trending",
  news: "News",
  recentPosts: "Recent Posts",
  myTrips: "My Trips",
  browseTrips: "Browse Trips",
  browseDestinations: "Browse Destinations",
  searchPlaceholder: "Search...",
  reconnect: "Reconnecting...",
  noPostsYet: "No posts yet",
  refreshContent: "Pull down to refresh",
  
  // Cities
  all: "All",
  culture: "Culture",
  beach: "Beach",
  mountain: "Mountain",
  desert: "Desert",
  forest: "Forest",
  island: "Island",
  filter: "Filter",
  sort_by: "Sort by",
  price_low_high: "Price (Low to High)",
  price_high_low: "Price (High to Low)",
  distance_near: "Distance (Nearest)",
  distance_far: "Distance (Farthest)",
  group_size: "Group Size",
  available_now: "Available Now",
  available_later: "Available Later",
  popular_cities: "Popular Cities",
  nearby_cities: "Nearby Cities",
  search_placeholder: "Search for your destination...",
  recommended_trips: "Recommended Trips",
  view_details: "View Details",
  
  // Trips
  bookNow: "Book Now",
  tripDetails: "Trip Details",
  organizer: "Organizer",
  duration: "Duration",
  days: "Days",
  includes: "Includes",
  excludes: "Excludes",
  itinerary: "Itinerary",
  location: "Location",
  date: "Date", 
  price: "Price",
  discountPrice: "Discount Price",
  originalPrice: "Original Price",
  rating: "Rating",
  reviews: "Reviews",
  transportation: "Transportation",
  accommodation: "Accommodation",
  meals: "Meals",
  activities: "Activities",
  dayByDay: "Day-by-day",
  knowBeforeYouGo: "Know Before You Go",
  bookingPolicy: "Booking Policy",
  cancellationPolicy: "Cancellation Policy",
  refundPolicy: "Refund Policy",
  allTrips: "All Trips",
  organized_trips: "Organized Trips",
  load_more: "Load More",
  show_less: "Show Less",

  // Posts
  writePost: "Write a post...",
  createPost: "Create Post",
  postDetails: "Post Details",
  addComment: "Add Comment",
  sharePost: "Share Post",
  likePost: "Like Post",
  commentPost: "Comment on Post",
  typeComment: "Type a comment...",
  postToProfile: "Post to Profile",
  postToFeed: "Post to Feed",
  addPhoto: "Add Photo",
  addVideo: "Add Video",
  addLocation: "Add Location",
  postHere: "Write your post here...",
  
  // Comments
  comments: "Comments",
  reply: "Reply",
  replyHere: "Reply here...",
  deleteComment: "Delete Comment",
  deleteReply: "Delete Reply",
  noComments: "No comments yet",
  beFirst: "Be the first to comment!",
  showMore: "Show more",
  showLess: "Show less",
  
  // Upgrade
  upgradeAccount: "Upgrade Account",
  becomeTourGuide: "Become a Tour Guide",
  stepOf: "Step {current} of {total}",
  uploadDocuments: "Upload Documents",
  uploadSelfie: "Upload Selfie",
  addBankDetails: "Add Bank Details",
  chooseSubscription: "Choose Subscription",
  verifyIdentity: "Verify Identity",
  benefits: "Benefits",
  subscription: "Subscription",
  freeAccount: "Free Account",
  premiumAccount: "Premium Account",
  continue: "Continue",
  selectPaymentMethod: "Select Payment Method",

  // Profile
  followers: "Followers",
  following: "Following",
  posts: "Posts",
  trips: "Trips",
  about: "About",
  contactInfo: "Contact Info",
  follow: "Follow",
  unfollow: "Unfollow",
  editCover: "Edit Cover",
  editAvatar: "Edit Avatar",
  saveCover: "Save Cover",
  saveAvatar: "Save Avatar",
  basicInfo: "Basic Info",
  city: "City",
  country: "Country",
  changePassword: "Change Password",
  uploadPhoto: "Upload Photo",
  bio: "Bio",
  updateProfile: "Update Profile",
  
  // Chats
  chats: "Chats",
  chat: "Chat",
  findTrips: "Find Trips",
  enterMessage: "Enter message...",
  noMessages: "No messages yet",
  startConversation: "Start a conversation!",
  sendMessage: "Send",
  viewProfile: "View Profile",
  blockUser: "Block User",
  reportUser: "Report User",
  clearChat: "Clear Chat",
  noChatSelected: "No chat selected",
  selectChat: "Select a chat to start messaging",
  
  // Map
  currentLocation: "Current Location",
  directions: "Directions",
  findNearby: "Find Nearby",
  saveLocation: "Save Location",
  findOnMap: "Find on Map",
  searchPlaces: "Search Places",
  noLocationAccess: "No location access",
  enableLocation: "Enable location access",
  savedLocations: "Saved Locations",
  nearbyPlaces: "Nearby Places",
  
  // User types
  tourGuides: "Tour Guides",
  travelers: "Travelers",
  locals: "Locals",
  all_posts: "All Posts",
  organizers: "Organizers",
  
  // Translation related
  translation: "Translation",
  translateToEnglish: "Translate to English",
  translateToFrench: "Translate to French",
  originalText: "Original Text",
  translatedText: "Translated Text",
  showTranslation: "Show Translation",
  hideTranslation: "Hide Translation",
  translated: "Translated",
  original: "Original",
  
  // Referral
  referFriend: "Refer a Friend",
  referralCode: "Referral Code",
  referralCodeCopied: "Referral code copied to clipboard!",
  earnPoints: "Earn Points",
  
  // Added to remove duplicate keys
  discover_morocco_beauty: "Discover the Beauty of Morocco",
  special_trips_moroccan_cities: "Special trips in Moroccan cities"
};

export default en;
