import Taro, { Component} from '@tarojs/taro'
import { View, Text, Slider} from '@tarojs/components'
import './index.scss'

type Props={
  currentTime:number,
  duration:number,
  onChange?:(value:number)=>void,
}


export default class SongSlider extends Component<Props> {



  formatSeconds(value:number):string{

    let seconds = Math.round(value%60) ;

    let minutes = Math.floor(value/60) ;


    return `${minutes}:${seconds}`;

  }

  render() {

    const {currentTime,duration} = this.props

    return (
      <View className={'song-slider'}>
          <Text className='song-slider__text'>{currentTime}</Text>
          <Slider
            blockSize={12}
            className={'song-slider__slider'}
            activeColor={'RGBA(74, 79, 82, 0.5)'}
            backgroundColor={'RGBA(36, 45, 54, 0.1)'}
            onChange={(event)=>{
              if(this.props.onChange){
                this.props.onChange(event.detail.value);
              }
            }}
            max={duration}
            value={currentTime}
          />
          <Text className='song-slider__text'>{this.formatSeconds(duration)}</Text>
    </View>
    )
  }
}
