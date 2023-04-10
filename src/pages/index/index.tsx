import React, {
  Component,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { View, Text, Image, Button, Input } from "@tarojs/components";

import Taro from "@tarojs/taro";
import "./index.scss";

// export default class Index extends Component<PropsWithChildren> {
//   componentWillMount() {}

//   componentDidMount() {
//     Taro.getSetting({
//       success: function (res) {
//         console.log(res, 99999);
//         if (!res.authSetting["scope.userInfo"]) {
//           Taro.authorize({
//             scope: "scope.userInfo",
//             success: function () {
//               Taro.getUserInfo({
//                 success: function (result) {
//                   console.log(8888);
//                   console.log(result);
//                   var userInfo = result.userInfo;
//                   var nickName = userInfo.nickName;
//                   var avatarUrl = userInfo.avatarUrl;
//                   var gender = userInfo.gender; //性别 0：未知、1：男、2：女
//                   var province = userInfo.province;
//                   var city = userInfo.city;
//                   var country = userInfo.country;
//                 },
//               });
//             },
//           });
//         }
//       },
//     });
//   }

//   componentWillUnmount() {}

//   componentDidShow() {}

//   componentDidHide() {}

//   render() {
//     return (
//       <View className="index">
//         <Text>Hello world!</Text>
//         <Text>我来了</Text>
//         <Text>88888999944555</Text>
//       </View>
//     );
//   }
// }

const Index1 = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [avatar, setAvatar] = useState(undefined);
  const [nickName, setNickName] = useState(undefined);

  console.log({ userInfo });

  // TODO: 用户信息缓存
  useEffect(() => {
    Taro.getSetting({
      complete: function (e) {
        console.log(e, 88888);
      },
      success: function (res) {
        console.log(res, 99999);
        Taro.authorize({
          scope: "scope.userInfo",
          success: function (e) {
            console.log(11111, e);
            Taro.getUserInfo({
              success: function (result) {
                console.log(result);
                setUserInfo(result.userInfo, "userInfo");
              },
            });
          },
        });
        if (!res.authSetting["scope.userInfo"]) {
          console.log(22222);
        }
      },
    });
  });

  const getUserInfo = (info) => {
    if (!userInfo) {
      Taro.getSetting({
        complete: function (e) {
          console.log(e, 88888);
        },
        success: function (res) {
          console.log(res, 99999);
          Taro.authorize({
            scope: "scope.camera",
            success: function () {
              console.log(11111);
              Taro.getUserInfo({
                success: function (result) {
                  console.log(result);
                  setUserInfo(result.userInfo);
                },
              });
            },
          });
        },
      });
    }
    const { detail } = info;
    setUserInfo(detail);
    console.log({ detail });
  };

  const handleClick = () => {
    Taro.getUserProfile({
      lang: "zh_CN",
      desc: "获取你的昵称、头像",
      success: (res) => {
        console.log(res);
      },
    });
  };

  const onChooseAvatar = (e) => {
    console.log(e, 8888, e.detail.avatarUrl);
    setAvatar(e.detail.avatarUrl);
    // uploadFile(e.detail.avatarUrl)
  };

  const goToUserPage = () => {
    Taro.navigateTo({
      url: "/pages/userPage",
    });
  };

  return (
    <View className="container">
      <View className="box" onClick={goToUserPage}>
        我的
      </View>
    </View>
  );
};

export default Index1;
