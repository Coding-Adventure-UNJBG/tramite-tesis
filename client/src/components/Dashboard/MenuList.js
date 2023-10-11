import { RxFileText, RxHome, RxReader, RxExit, RxPerson } from 'react-icons/rx'
import { TbReport } from 'react-icons/tb'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import { LiaBriefcaseMedicalSolid } from 'react-icons/lia'


export const menus = [
  { name: 'Home', link: '/', icon: RxHome },
  { name: 'Solicitud', link: '/solicitud', icon: HiOutlineClipboardDocumentList, permission: 'solicitud' },
  { name: 'Tesis', link: '/tesis', icon: RxReader, permission: 'tesis' },
  { name: 'Upload', link: '/upload', icon: RxFileText },
  { name: 'Portafolio', link: '/portafolio', icon: LiaBriefcaseMedicalSolid },
  { name: 'Reporte', link: '/reporte', icon: TbReport },
  { name: 'Usuario', link: '/usuario', icon: RxPerson, margin: true, permission: 'usuarios' },
]