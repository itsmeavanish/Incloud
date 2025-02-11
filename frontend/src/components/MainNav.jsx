
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { TiCloudStorageOutline } from 'react-icons/ti';
import { TbPhotoSquareRounded, TbTrashFilled } from 'react-icons/tb';
import { AiFillClockCircle } from 'react-icons/ai';
import { CiHeart, CiLink } from 'react-icons/ci';
const NavList=styled.ul`
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: center;
    list-style-type: none;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 1rem;
    
`
const StyledNavLink=styled(NavLink)`
    &:link,
    &:visited{
        display: flex;
        align-items: center;
        gap: 1.2rem;
        color:  #BDDFFC;
     padding: 1.2rem 2rem;
        transition: all 0.3s;
        text-decoration: none;
        
    }
    &:hover,
    &:active,
    &.active:link,
    &.active:visited{
        color:  #BDDFFC;
        background-color: #1B8DEA;
        border-radius: 5px;
    }
    & svg{
        width: 1.5rem;
        height: 1.5rem;
        color: #BDDFFC;
        transition: all 0.3s;
        }
        &:hover svg,
    &:active svg,
    &.active:link svg,
    &.active:visited svg{
        color: #6912C7;
    }

`
export default function MainNav() {
  return (
    
        <NavList>
            <li>
                <StyledNavLink to="/storage">
                <TiCloudStorageOutline />
                <span >My Storage</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/media">
                <TbPhotoSquareRounded />
                <span>Media Uploader</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/recents">
                <AiFillClockCircle />
                <span>Recents</span>
                </StyledNavLink>
            </li>
            
            <li>
                <StyledNavLink to="/favorites">
                <CiHeart />
                <span>Favorites</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/sharedlinks">
                <CiLink />
                <span>Shared links</span>
                </StyledNavLink>
            </li>
            <li>
                <StyledNavLink to="/trash">
                <TbTrashFilled />
                    <span>Trash</span>
                </StyledNavLink>
            </li>
        </NavList>

  )
}
