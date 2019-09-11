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


type Props={
  // cycleType:CycleType,
  // isPlaying:boolean, //是否在播放
}

type State={
  cycleType:CycleType,
  isPlaying:boolean, //是否在播放
}

const musicUrl = "http://m8.music.126.net/20190912001146/8c84b162ecf059fbeab117d3b13d46a2/ymusic/540f/0453/025f/ce4b75c2393963607599558a1f709ec9.mp3"


export default class SongControl extends Component<Props,State> {

  static defaultProps={
    // cycleType:CycleType.cycle,
    // isPlaying:false,
  }

  audio: Taro.BackgroundAudioManager

  constructor(props:Props){
    super(props);

    if (process.env.TARO_ENV === 'weapp') {

      const backgroundAudioManager = Taro.getBackgroundAudioManager()
      backgroundAudioManager.title = '好喜欢你'
      backgroundAudioManager.singer = '眼中人'
      backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
      backgroundAudioManager.src = musicUrl;
      this.audio = backgroundAudioManager;
      this.audio.pause();

    }else if (process.env.TARO_ENV === 'h5') {



    }

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
                this.audio.play();
              }else{
                this.audio.pause();
              }
          })

        }}>{isPlaying ? '⏸':'▶️'}</Text>
        <Text> ⏭ </Text>
        <Text> 列表 </Text>


        {process.env.TARO_ENV === 'h5' ?
          <div>
            <h1>444444222</h1>
            <audio src={musicUrl} type="audio/mpeg"></audio>
          </div>:null
        }

      </View>
    )
  }
}



