import React, {
  Component,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { View, Text, Image, Button, Input } from "@tarojs/components";

import Taro from "@tarojs/taro";

const Index = () => {
  const [avatar, setAvatar] = useState(undefined);
  const [nickName, setNickName] = useState(undefined);

  const onChooseAvatar = (e) => {
    console.log(e, 8888, e.detail.avatarUrl);
    setAvatar(e.detail.avatarUrl);
  };

  return (
    <View className="container">
      {avatar ? (
        <Image src={avatar} style="width: 100px; height: 100px" />
      ) : (
        <Button open-type="chooseAvatar" onChooseAvatar={onChooseAvatar}>
          选择头像
        </Button>
      )}
      <Input
        placeholder="请输入昵称"
        value={nickName}
        onInput={(e) => setNickName(e.detail.value)}
      >
        输入昵称
      </Input>
    </View>
  );
};

export default Index;
