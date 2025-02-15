import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { TiCloudStorageOutline } from 'react-icons/ti';
import { TbPhotoSquareRounded, TbTrashFilled } from 'react-icons/tb';
import { AiFillClockCircle } from 'react-icons/ai';
import { CiHeart, CiLink } from 'react-icons/ci';

const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  list-style-type: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 1rem;

  @media (max-width: 768px) {
    font-size: 0.8rem;
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 0.5rem;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: #bddffc;
    padding: 1.2rem 2rem;
    transition: all 0.3s;
    text-decoration: none;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: #bddffc;
    background-color: #1b8dea;
    border-radius: 5px;
  }

  & svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #bddffc;
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: #6912c7;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    gap: 1rem;

    & svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }

  @media (max-width: 480px) {
    padding: 0.8rem 1rem;
    gap: 0.8rem;

    & svg {
      width: 1rem;
      height: 1rem;
    }
  }
`;

export default function MainNav() {
  return (
    <NavList>
      <li>
        <StyledNavLink to="/storage">
          <TiCloudStorageOutline />
          <span>My Storage</span>
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
  );
}
