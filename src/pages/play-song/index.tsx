import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Slider,Progress } from '@tarojs/components'
import SongControl from './song-control'

export default class index extends Component {
  render() {
    return (
      <View>
        <Slider />
        {/* <Progress /> */}
        <SongControl />
      </View>
    )
  }
}

