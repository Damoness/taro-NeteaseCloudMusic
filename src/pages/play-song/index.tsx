import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text, Slider,Progress } from '@tarojs/components'
import SongControl from './song-control'
import SongSlider from './song-slider'


type  Props={

}

const musicUrl = "http://m8.music.126.net/20190914152609/497c69bace13288288ec4bb6420fc2fa/ymusic/5353/0009/015c/d9d141b8947c84455bd066298ce06dee.mp3"


export default class index extends Component<Props> {

  audio: Taro.BackgroundAudioManager


  state={
    duration:0,
    currentTime:0,
  }

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

      // setInterval(()=>{

      //   console.log(this.audio.currentTime);
      // },1000)

      this.audio.onTimeUpdate(()=>{

        console.log(this.audio.currentTime);
        this.setState({
          currentTime:this.audio.currentTime,
          duration:this.audio.duration,
        })

      })

    }else if (process.env.TARO_ENV === 'h5') {



    }

  }


  render() {

    const {currentTime,duration}  = this.state

    return (
      <View className={'container'}>
        <SongSlider
          currentTime={currentTime}
          duration={duration}
          onChange={(value)=>{

            this.audio.seek(value);

          }}
        />

        <SongControl
              onPlay={()=>{
                        this.audio.play();
                     }}
                     onPause={()=>{
                      this.audio.pause();
                    }}

        />
      </View>
    )
  }
}

