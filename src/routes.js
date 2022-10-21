import Home from "./pages/Home";
import Friends from "./pages/Friends";
import People from "./pages/People";
import MyProfile from "./pages/MyProfile";
import FriendRequests from "./pages/FriendRequests";
export const routes = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: Home,
  },
  // {
  //   key: "academics-route",
  //   title: "Academics",
  //   path: "/academics",
  //   enabled: true,
  //   component: Academics,
  // },
  {
    key: "people-route",
    title: "People",
    path: "/people",
    enabled: true,
    component: People,
  },
  {
    key: "myprofile-route",
    title: "MyProfile",
    path: "/myprofile",
    enabled: true,
    component: MyProfile,
  },
  {
    key: "friends-route",
    title: "Friends",
    path: "/friends",
    enabled: true,
    component: Friends,
  },
  {
    key: "friendRequests-route",
    title: "Friend Requests",
    path: "/friendrequests",
    enabled: true,
    component: FriendRequests,
  },
];
