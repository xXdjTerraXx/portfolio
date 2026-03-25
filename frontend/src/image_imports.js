import * as PIXI from 'pixi.js'
//png images
import BackgroundImg from './img/png/background.png'
import SoccerBall from './img/png/ball_dark.png'
import BedImg from './img/png/bed.png'
import BookShelfImg from './img/png/book_shelf.png'
import BoxFanImg from './img/png/box_fan.png'
import CablesImg from './img/png/cables.png'
import CharacterImg from './img/png/character.png'
import CharacterHitboxImg from './img/png/character_hitbox.png'
import CoffeeCupHitboxImg from './img/png/coffee_cup_hitbox.png'
import ComputerHitboxImg from './img/png/computer_hitbox.png'
import JournalImg from './img/png/journal.png'
import JournalHitboxImg from './img/png/journal_hitbox.png'
import LavaLampOff from './img/png/lava_lamp_off.png'
import LavaLampHitboxImg from './img/png/lava_lamp_hitbox.png'
import MonitorBackgroundImg from './img/png/monitor_background.png'
import NightstandLavaLampImg from './img/png/nightstand_lava_lamp.png'
import NoteImg from './img/png/note.png'
import NoteShadingImg from './img/png/note_shading.png'
import NotesBoardImg from './img/png/notes_board.png'
import NotesBoardHitboxImg from './img/png/notes_board_hitbox.png'
import OfflineSignImg from './img/png/offline_sign.png'
import OnlineOfflineHitboxImg from './img/png/online_sign_hitbox.png'
import OnlineStatusBubbleImg from './img/png/online_status_bubble.png'
import PCDeskImg from './img/png/pc_desk.png'
import Plant1Img from './img/png/plant_1.png'
import Plant2Img from './img/png/plant_2.png'
import PosterImg from './img/png/posters.png'
import RokuCityImg from './img/png/roku_city.png'
import RokuCityParallaxBackgroundImg from './img/png/roku_city_parallax_background_layers.png'
import RokuCityParallaxForegroundImg from './img/png/roku_city_parallax_foreground_layers.png'
import TVStandImg from './img/png/tv_stand.png'
import WindowImg from './img/png/window.png'
import TapestryImg from './img/png/tapestry.png'
import TestBG from './img/png/test_bg.png'
import TextMask from './img/png/text_mask.png'
import TVHitboxImg from './img/png/tv_hitbox.png'
import SpotifyPixel from './img/png/spotify_pixel.png'
import Speaker from './img/png/speaker.png'
import SpeakerHitboxImg from './img/png/speaker_hitbox.png'
import SpeakerMenuBackground from './img/png/speaker_menu_background.png'
import SpeakerMenuTracking from './img/png/speaker_menu_tracking.png'
import SpeakerMenuVolume from './img/png/speaker_menu_volume.png'
import SpeakerMenuClose from './img/png/speaker_menu_close.png'
import SpeakerMenuPlay from './img/png/speaker_menu_play.png'
import SpeakerMenuPause from './img/png/speaker_menu_pause.png'
import SpeakerMenuStop from './img/png/speaker_menu_stop.png'
import SpeakerMenuNext from './img/png/speaker_menu_next.png'
import SpeakerMenuPrevious from './img/png/speaker_menu_previous.png'
import StringLights_StringImg from './img/png/string_lights_string.png'
import StringLights_LightsImg from './img/png/string_lights_lights.png'
import StringLights_Lights2Img from './img/png/string_lights_lights2.png'
import ThoughtBubbleSmall from './img/png/thought_bubble_small.png'
import ThoughtBubbleMedium from './img/png/thought_bubble_medium.png'
import ThoughtBubbleMain from './img/png/thought_bubble_main.png'
import TVBackground from './img/png/tv_background.png'
import TVGlare from './img/png/tv_glare.png'
import TVBackgroundLandscape from './img/png/tv_background_landscape.png'
import ScrollButton from './img/png/scroll_button.png'
import ScrollButtonInactive from './img/png/scroll_button_inactive.png'
import AquariumCase from './img/png/aquarium_case.png'
import RugImg from './img/png/rug.png'
import BonsaiStation_PotImg from './img/png/bonsai_station/pot.png'
import BonsaiStation_TrunkImg from './img/png/bonsai_station/trunk.png'
import BonsaiStation_BloomsImg from './img/png/bonsai_station/blooms.png'
import BonsaiStation_GrowLightImg from './img/png/bonsai_station/grow_light.png'
import BonsaiStation_GrowLightSwitchOffImg from './img/png/bonsai_station/grow_light_switch_off.png'
import BonsaiStation_GrowLightSwitchOnImg from './img/png/bonsai_station/grow_light_switch_on.png'
import BonsaiStation_GrowLightBeamImg from './img/png/bonsai_station/grow_light_beam.png'
import BonsaiStation_GrowLight_NewShadingImg from './img/png/bonsai_station/grow_light_on_new_shading.png'
import BonsaiStationHitboxImg from './img/png/bonsai_station/bonsai_station_hitbox.png'
import WindowHitboxImg from './img/png/window_hitbox.png'

//icons
import MyComputerIcon from './img/png/icons/my_computer_icon.png'
import AboutMeIcon from './img/png/icons/about_me_icon.png'
import ProjectsIcon from './img/png/icons/projects_icon.png'
import PowerIcon from './img/png/icons/power_icon.png'
import XButton from './img/png/icons/x_button.png'
import XButtonRed from './img/png/icons/x_button_red.png'

//sprite sheets
import CharacterSpriteSheet from './img/sprite_sheets/character_sprite_sheet.png'
import CharacterOfflineSpriteSheet from './img/sprite_sheets/character_offline_sprite_sheet.png'
import CoffeeSpriteSheet from './img/sprite_sheets/coffee_sprite_sheet.png'
import DeskSpriteSheet from './img/sprite_sheets/desk_sprite_sheet.png'
import DeskSpriteSheet2 from './img/sprite_sheets/desk_sprite_sheet2.png'
import LavaLampSpriteSheet from './img/sprite_sheets/lava_lamp_sprite_sheet.png'
import OnlineSpriteSheet from './img/sprite_sheets/online_sprite_sheet.png'
import SelectionArrowSpriteSheet from './img/sprite_sheets/selection_arrow_sprite_sheet.png'
import TVStandSpriteSheet from './img/sprite_sheets/tv_stand_sprite_sheet.png'
import PixelRainSpriteSheet from './img/sprite_sheets/rain_sprite_sheet.png'
import SpeakerSpriteSheet from './img/sprite_sheets/speaker_sprite_sheet.png'
import AquariumSpriteSheet from './img/sprite_sheets/aquarium_sprite_sheet.png'
import AquariumSceneBGSpriteSheet from './img/sprite_sheets/aquarium_scene_spritesheet.png'
import JournalSpriteSheet from './img/sprite_sheets/journal_spritesheet.png'
import NotesBoardSpriteSheet from './img/sprite_sheets/notes_board_spritesheet.png'
import LiveBlinkerSpriteSheet from './img/sprite_sheets/live_blinker.png'

//weather icons
import DayClear from './img/png/weather_icons/day/clear.png'
import DayCloudy from './img/png/weather_icons/day/cloudy.png'
import DayFullCloudy from './img/png/weather_icons/day/full_cloudy.png'
import DayRain from './img/png/weather_icons/day/rain.png'
import NightClear from './img/png/weather_icons/night/clear.png'
import NightCloudy from './img/png/weather_icons/night/cloudy.png'
import NightRain from './img/png/weather_icons/night/rain.png'
import NightStorm from './img/png/weather_icons/night/storm.png'
import NightMist from './img/png/weather_icons/night/mist.png'

//sound
import FourAmNostalgia from './sounds/4am nostalgia.mp3'
import ElevenAmLight from './sounds/11am.mp3'
import FourPmRain from './sounds/4pm rain.mp3'
import RoomNoise from './sounds/room_noise.mp3'
import Rain from './sounds/rain.mp3'

//fonts
import PixelEmulator from './fonts/PixelEmulator.ttf'
import Pixellari from './fonts/Pixellari.ttf'
import NotesFont from './fonts/gloriahallelujah.ttf'

//lights
import RadialGlowImg from './img/png/lights/radial_glow.png'
import WideGlowImg from './img/png/lights/wide_glow.png'
import OnlineGlowImg from './img/png/lights/online_glow.png'

export const roomSceneManifest =  {
   "bundles":[
      //pngs
      {
         "name":"png",
         "assets":[
            {
               "alias":"BackgroundImg",
               "src":BackgroundImg
            },
            {
               "alias":"SoccerBall",
               "src":SoccerBall  
            },
            {
               "alias":"BedImg",
               "src":BedImg
            },
            {
               "alias":"BookShelfImg",
               "src":BookShelfImg
            },
            {
               "alias":"BoxFanImg",
               "src":BoxFanImg
            },
            {
               "alias":"CablesImg",
               "src":CablesImg
            },
            {
               "alias":"CharacterImg",
               "src":CharacterImg
            }, 
            {
               "alias":"CharacterHitbox",
               "src":CharacterHitboxImg
            }, 
            {
               "alias":"CoffeeCupHitbox",
               "src":CoffeeCupHitboxImg
            }, 
            {
               "alias": "ComputerHitbox",
               "src": ComputerHitboxImg
            },
            {
               "alias": "Journal",
               "src": JournalImg
            },
            {
               "alias": "JournalHitbox",
               "src": JournalHitboxImg
            },
            {
               "alias":"LavaLampOff",
               "src":LavaLampOff
            }, 
            {
               "alias": "LavaLampHitbox",
               "src": LavaLampHitboxImg
            },
            {
               "alias": "MonitorBackgroundImg",
               "src": MonitorBackgroundImg
            },
            {
               "alias": "NightstandLavaLampImg",
               "src": NightstandLavaLampImg
            },
            {
               "alias": "NotesBoard",
               "src": NotesBoardImg
            },
            {
               "alias": "NotesBoardHitbox",
               "src": NotesBoardHitboxImg
            },
            {
               "alias": "Note",
               "src": NoteImg
            },
            {
               "alias": "NoteShading",
               "src": NoteShadingImg
            },
            {
               "alias": "OfflineSign",
               "src": OfflineSignImg
            },
            {
               "alias": "OnlineOfflineHitbox",
               "src": OnlineOfflineHitboxImg
            },
            {
               "alias": "OnlineStatusBubble",
               "src": OnlineStatusBubbleImg
            },
            {
               "alias": "PCDeskImg",
               "src": PCDeskImg
            },
            {
               "alias": "Plant1Img",
               "src": Plant1Img
            },
            {
               "alias": "Plant2Img",
               "src": Plant2Img
            },
            {
               "alias": "PosterImg",
               "src": PosterImg
            },
            {
               "alias": "RugImg",
               "src": RugImg
            },
            {
               "alias": "TapestryImg",
               "src": TapestryImg
            },
            {
               "alias": "RokuCity",
               "src": RokuCityImg
            },
            {
               "alias": "RokuCityParallaxBackground",
               "src": RokuCityParallaxBackgroundImg
            },
            {
               "alias": "RokuCityParallaxForeground",
               "src": RokuCityParallaxForegroundImg
            },
            {
               "alias": "TVStandImg",
               "src": TVStandImg
            },
            {
               "alias": "WindowImg",
               "src": WindowImg
            },
            {
               "alias": "TestBG",
               "src": TestBG
            },
            {
               "alias": "TextMask",
               "src": TextMask
            },
            {
               "alias": "TVHitbox",
               "src": TVHitboxImg
            },
            {
               "alias": "SpotifyPixel",
               "src": SpotifyPixel
            },
            {
               "alias": "ThoughtBubbleSmall",
               "src": ThoughtBubbleSmall
            },
            {
               "alias": "ThoughtBubbleMedium",
               "src": ThoughtBubbleMedium
            },
            {
               "alias": "ThoughtBubbleMain",
               "src": ThoughtBubbleMain
            },
            {
               "alias": "TVBackground",
               "src": TVBackground
            },
            {
               "alias": "TVGlare",
               "src": TVGlare
            },
            {
               "alias": "TVBackgroundLandscape",
               "src": TVBackgroundLandscape
            },
            {
               "alias": "Speaker",
               "src": Speaker
            },
            {
               "alias": "SpeakerHitbox",
               "src": SpeakerHitboxImg
            },
            {
               "alias": "SpeakerMenuBackground",
               "src": SpeakerMenuBackground
            },
            {
               "alias": "SpeakerMenuTracking",
               "src": SpeakerMenuTracking
            },
            {
               "alias": "SpeakerMenuVolume",
               "src": SpeakerMenuVolume
            },
            {
               "alias": "SpeakerMenuClose",
               "src": SpeakerMenuClose
            },
            {
               "alias": "SpeakerMenuPlay",
               "src": SpeakerMenuPlay
            },
            {
               "alias": "SpeakerMenuPause",
               "src": SpeakerMenuPause
            },
            {
               "alias": "SpeakerMenuStop",
               "src": SpeakerMenuStop
            },
            {
               "alias": "SpeakerMenuNext",
               "src": SpeakerMenuNext
            },
            {
               "alias": "SpeakerMenuPrevious",
               "src": SpeakerMenuPrevious
            },
            {
               "alias": "ScrollButton",
               "src": ScrollButton
            },
            {
               "alias": "ScrollButtonInactive",
               "src": ScrollButtonInactive
            },
            {
               "alias": "AquariumCase",
               "src": AquariumCase
            },
            {
               "alias": "StringLights_String",
               "src": StringLights_StringImg
            },
            {
               "alias": "StringLights_Lights",
               "src": StringLights_LightsImg
            },
            {
               "alias": "StringLights_Lights2",
               "src": StringLights_Lights2Img
            },
            {
               "alias": "BonsaiStation_Pot",
               "src": BonsaiStation_PotImg
            },
            {
               "alias": "BonsaiStation_Trunk",
               "src": BonsaiStation_TrunkImg
            },
            {
               "alias": "BonsaiStation_Blooms",
               "src": BonsaiStation_BloomsImg
            },
            {
               "alias": "BonsaiStation_GrowLight",
               "src": BonsaiStation_GrowLightImg
            },
            {
               "alias": "BonsaiStation_GrowLightSwitchOff",
               "src": BonsaiStation_GrowLightSwitchOffImg
            },
            {
               "alias": "BonsaiStation_GrowLightSwitchOn",
               "src": BonsaiStation_GrowLightSwitchOnImg
            },
            {
               "alias": "BonsaiStation_GrowLightBeam",
               "src": BonsaiStation_GrowLightBeamImg
            },
            {
               "alias": "BonsaiStation_GrowLight_NewShading",
               "src": BonsaiStation_GrowLight_NewShadingImg
            },
            
            {
               "alias": "BonsaiStationHitbox",
               "src": BonsaiStationHitboxImg
            },
            {
               "alias": "WindowHitbox",
               "src": WindowHitboxImg
            }
         ]
      },
      //sprite sheets
      {
         "name":"sprite_sheets",
         "assets":[
            {
               "alias":"LavaLampSpriteSheet",
               "src":LavaLampSpriteSheet
            },
            {
               "alias":"DeskSpriteSheet2",
               "src":DeskSpriteSheet2
            },
            {
               "alias":"CharacterSpriteSheet",
               "src":CharacterSpriteSheet
            },
            {
               "alias":"DeskSpriteSheet2",
               "src":DeskSpriteSheet2
            },
            {
               "alias":"CoffeeSpriteSheet",
               "src":CoffeeSpriteSheet
            },
            {
               "alias":"SelectionArrowSpriteSheet",
               "src":SelectionArrowSpriteSheet
            },
            {
               "alias":"OnlineSpriteSheet",
               "src":OnlineSpriteSheet
            },
            {
               "alias":"CharacterOfflineSpriteSheet",
               "src":CharacterOfflineSpriteSheet
            },
            {
               "alias":"TVStandSpriteSheet",
               "src":TVStandSpriteSheet
            },
            {
               "alias": "PixelRainSpriteSheet",
               "src": PixelRainSpriteSheet
            },
            {
               "alias": "SpeakerSpriteSheet",
               "src": SpeakerSpriteSheet
            },
            {
               "alias": "AquariumSpriteSheet",
               "src": AquariumSpriteSheet
            },
            {
               "alias": "AquariumSceneBGSpriteSheet",
               "src": AquariumSceneBGSpriteSheet
            },
            {
               "alias": "JournalSpriteSheet",
               "src": JournalSpriteSheet
            },
            {
               "alias": "NotesBoardSpriteSheet",
               "src": NotesBoardSpriteSheet
            },
            {
               "alias": "LiveBlinkerSpriteSheet",
               "src": LiveBlinkerSpriteSheet
            }
         ]
      },
      //icons
      {
         "name":"icons",
         "assets":[
            {
               "alias":"MyComputerIcon",
               "src":MyComputerIcon
            },
            {
               "alias":"AboutMeIcon",
               "src": AboutMeIcon
            },
            {
               "alias":"ProjectsIcon",
               "src": ProjectsIcon
            },
            {
               "alias":"PowerIcon",
               "src": PowerIcon
            },
            {
               "alias":"XButton",
               "src": XButton
            },
            {
               "alias":"XButtonRed",
               "src": XButtonRed
            }
         ]
      },
      //weahter icons
      {
         "name":"weather_icons",
         "assets":[
            {
               "alias":"DayClear",
               "src":DayClear
            },
            {
               "alias":"DayCloudy",
               "src":DayCloudy
            },
            {
               "alias":"DayFullCloudy",
               "src":DayFullCloudy
            },
            {
               "alias":"DayRain",
               "src":DayRain
            },
            {
               "alias":"NightClear",
               "src":NightClear
            },
            {
               "alias":"NightCloudy",
               "src":NightCloudy
            },
            {
               "alias":"NightRain",
               "src":NightRain
            },
            {
               "alias":"NightStorm",
               "src":NightStorm
            },
            {
               "alias":"NightMist",
               "src":NightMist
            },
         ]
      },
      //fonts
      {
         "name": "fonts",
         "assets": [
            {
               "alias": "PixelEmulator",
               "src": PixelEmulator
            },
            {
               "alias": "Pixellari",
               "src": Pixellari
            },
            {
               "alias": "NotesFont",
               "src": NotesFont
            }
         ]
      },
      //lights
      {
         "name": "lights",
         "assets":[
            {
               "alias": 'RadialGlow',
               "src": RadialGlowImg
            },
            {
               "alias": 'WideGlow',
               "src": WideGlowImg
            },
            {
               "alias": 'OnlineGlow',
               "src": OnlineGlowImg
            }
         ]
      }
   ]
}



export const pngImages = {
    BackgroundImg: BackgroundImg, 
    BedImg: BedImg, 
    BookShelfImg: BookShelfImg, 
    BoxFanImg: BoxFanImg, 
    CablesImg: CablesImg, 
    CharacterImg: CharacterImg, 
    NightstandLavaLampImg: NightstandLavaLampImg, 
    PCDeskImg: PCDeskImg, 
    Plant1Img: Plant1Img, 
    Plant2Img: Plant2Img, 
    PosterImg: PosterImg,
    SpeakerMenuBackground: SpeakerMenuBackground,
    TVStandImg: TVStandImg, 
    WindowImg: WindowImg
}

export const spriteSheets = {
    CharacterSpriteSheet: CharacterSpriteSheet,
    CoffeeSpriteSheet: CoffeeSpriteSheet, 
    DeskSpriteSheet: DeskSpriteSheet, 
    DeskSpriteSheet2: DeskSpriteSheet2,
    LavaLampSpriteSheet: LavaLampSpriteSheet, 
    SelectionArrowSpriteSheet: SelectionArrowSpriteSheet,
    SpeakerSpriteSheet: SpeakerSpriteSheet
}


export function loadAssets(){
   console.log('loading assets....')
   PIXI.Assets.addBundle('png', {
      BackgroundImg: './img/png/background.png',
    });
} 