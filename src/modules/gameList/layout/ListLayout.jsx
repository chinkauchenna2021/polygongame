import React , {memo} from 'react'
import * as S from '../styles/Styles';
import NavBar from '../../../common/layouts/NavBar';
import { moveToHome , moveBack } from '../../Hook/useHook';


function ListLayout({ children  , borderProperties}) {
  // const homePage = () => {
  //   //   moveBack();
  //     console.log("okay")
  // }

  return (
    <S.List className={` pl-1 pr-3 flex flex-row items-center justify-between  container rounded-full min-h-[30px]  w-11/12 ${borderProperties}  lg:w-full`}>
          {children} 
    </S.List>
  )
}

export default memo(ListLayout)