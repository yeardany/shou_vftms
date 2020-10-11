import Camera from '../views/camera/camera.vue'
import CameraDetail from '../views/camera/cameraDetail.vue'
import FishCamera from '../views/camera/fishCamera.vue'
import IslandCamera from '../views/camera/islandCamera.vue'
import EquipmentCamera from '../views/camera/equipmentCamera.vue'
import Map from '../views/camera/Map.vue'
import Environment from '../views/environment/environment.vue'
import EnvironmentDetail from '../views/environment/environmentDetail.vue'
import EnvironmentO2 from '../views/environment/environmentO2.vue'
import EnvironmentPH from '../views/environment/environmentPH.vue'
import EnvironmentTemperature from '../views/environment/environmentTemperature.vue'
import Home from '../views/home/home.vue'
import Inspect from '../views/inspect/inspect.vue'
import InspectDetail from '../views/inspect/inspectDetail.vue'
import NewInspect from '../views/inspect/newInspect.vue'
import Login from '../views/login/login.vue'
import Weather from '../views/weather/weather.vue'
import WeatherDetail from '../views/weather/weatherDetail.vue'

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/cameraDetail',
    component: CameraDetail
  },
  {
    path: '/Map',
    component: Map
  },
  {
    path: '/environmentDetail',
    component: EnvironmentDetail,
    redirect: '/environmentDetail/enO2',
    children: [
      {
        path: 'enO2',
        component: EnvironmentO2
      },
      {
        path: 'enPH',
        component: EnvironmentPH
      },
      {
        path: 'enTem',
        component: EnvironmentTemperature
      }
    ]
  },
  {
    path: '/home',
    component: Home,
    redirect: '/home/camera',
    children: [
      {
        path: 'camera',
        component: Camera,
        redirect: '/home/camera/fishery',
        children: [
          {
            path: 'fishery',
            component: FishCamera
          },
          {
            path: 'island',
            component: IslandCamera
          },
          {
            path:'equipment',
            component: EquipmentCamera
          }
        ]
      },
      {
        path: 'environment',
        component: Environment
      },
      {
        path: 'inspect',
        component: Inspect
      },
      {
        path: 'weather',
        component: Weather
      }
    ]
  },
  {
    path: '/inspectDetail',
    component: InspectDetail
  },
  {
    path: '/newInspect',
    component: NewInspect
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/weatherDetail',
    component: WeatherDetail
  }
]
