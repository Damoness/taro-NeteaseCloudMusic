import Taro, { Component, Config} from '@tarojs/taro'
import { View, Button, Text} from '@tarojs/components'

import './index.scss'

export enum CycleType {
    cycle=0, //整体循环
    onlyYou=1, //只循环这个
    random = 2, //随机
}

const CycleTypeString={
  [CycleType.cycle]:'循环',
  [CycleType.onlyYou]:'你',
  [CycleType.random]:'随机',
}

type callback = () => void;

type Props={
  // cycleType:CycleType,
  // isPlaying:boolean, //是否在播放
  onPlay?:callback;
  onPause?:callback;

}

type State={
  cycleType:CycleType,
  isPlaying:boolean, //是否在播放
}

export default class SongControl extends Component<Props,State> {

  static defaultProps={
    // cycleType:CycleType.cycle,
    // isPlaying:false,
  }

  audio: Taro.BackgroundAudioManager

  constructor(props:Props){
    super(props);

  }

  state={
    cycleType:CycleType.cycle,
    isPlaying:false,
  }


  render() {

    const {isPlaying,cycleType} = this.state;

    return (
      <View className='song-control'>
        <Text onClick={()=>{
          this.setState((preState)=>({cycleType:(preState.cycleType+1)%3}))
        }}>{CycleTypeString[cycleType]}</Text>
        <Text> ⏮ </Text>
        <Text onClick={()=>{

          this.setState((preState)=>({isPlaying:!preState.isPlaying}),()=>{
              if(this.state.isPlaying){
                this.props.onPlay && this.props.onPlay();
              }else{
                this.props.onPause && this.props.onPause();
              }
          })

        }}>{isPlaying ? '⏸':'▶️'}</Text>
        <Text> ⏭ </Text>
        <Text> 列表 </Text>


        {/* {process.env.TARO_ENV === 'h5' ?
          <div>
            <h1>444444222</h1>
            <audio src={musicUrl} type="audio/mpeg"></audio>
          </div>:null
        } */}

      </View>
    )
  }
}



