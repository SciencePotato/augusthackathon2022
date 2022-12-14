import type { NextPage } from 'next';
import Link from 'next/link';
import scss from '../styles/header.module.scss'

interface Props {
  num: Number;
}

const Nav: NextPage<Props> = (props) => {
  return (
    <section className={scss.header}>
      <div>
        <h1><Link href={'/'}>Info</Link><span><Link href={'/'}>Share</Link></span></h1>
      </div>

      <div>
        <div>
          {
            props.num == 1 &&
            <>
              <h2 className={scss.active}> 
                <Link href={"/home"}> Homepage </Link>
              </h2>
              <h2> 
                <Link href={"/about"}> About </Link>
              </h2>
              <h2> 
              <Link href={"/profile"}> Profile </Link>
              </h2>
            </>
          }
          {
            props.num == 2 &&
            <>
              <h2> 
                <Link href={"/home"}> Homepage </Link>
              </h2>
              <h2 className={scss.active}> 
                <Link href={"/about"} > About </Link>
              </h2>
              <h2> 
              <Link href={"/profile"}> Profile </Link>
              </h2>
            </>
          }
          {
            props.num == 3 &&
            <>
            <h2> 
                <Link href={"/home"}> Homepage </Link>
              </h2>
              <h2>
                <Link href={"/about"}> About </Link>
              </h2>
              <h2 className={scss.active}> 
                <Link href={"/profile"} > Profile </Link>
              </h2>
            </>
          }

          {
            props.num == 4 &&
            <>
              <h2> 
                <Link href={"/home"}> Homepage </Link>
              </h2>
              <h2>
                <Link href={"/about"}> About </Link>
              </h2>
              <h2> 
                <Link href={"/profile"} > Profile </Link>
              </h2>
            </>
          }


          {
            props.num == 5 &&
            <>
              <h2> 
                <Link href={"/home"}> Homepage </Link>
              </h2>
              <h2>
                <Link href={"/about"}> About </Link>
              </h2>
              <h2> 
                <Link href={"/profile"} > Profile </Link>
              </h2>
            </>
          }
          
        </div>
      </div>

      <div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
            <path d="M28.1667 30L17.2083 19.0417C16.375 19.7639 15.4028 20.3264 14.2917 20.7292C13.1806 21.1319 12 21.3333 10.75 21.3333C7.75 21.3333 5.20833 20.2917 3.125 18.2083C1.04167 16.125 0 13.6111 0 10.6667C0 7.72222 1.04167 5.20833 3.125 3.125C5.20833 1.04167 7.73611 0 10.7083 0C13.6528 0 16.1597 1.04167 18.2292 3.125C20.2986 5.20833 21.3333 7.72222 21.3333 10.6667C21.3333 11.8611 21.1389 13.0139 20.75 14.125C20.3611 15.2361 19.7778 16.2778 19 17.25L30 28.1667L28.1667 30ZM10.7083 18.8333C12.9583 18.8333 14.875 18.0347 16.4583 16.4375C18.0417 14.8403 18.8333 12.9167 18.8333 10.6667C18.8333 8.41667 18.0417 6.49306 16.4583 4.89583C14.875 3.29861 12.9583 2.5 10.7083 2.5C8.43056 2.5 6.49306 3.29861 4.89583 4.89583C3.29861 6.49306 2.5 8.41667 2.5 10.6667C2.5 12.9167 3.29861 14.8403 4.89583 16.4375C6.49306 18.0347 8.43056 18.8333 10.7083 18.8333Z" fill="#3B3B3C"/>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M15.137 3.945c-.644-.374-1.042-1.07-1.04-1.82v-.003c0-1.172-.939-2.122-2.097-2.122s-2.097.95-2.097 2.122v.003c.002.751-.396 1.446-1.04 1.82-4.668 2.712-1.986 11.715-6.863 13.306v1.749h20v-1.749c-4.877-1.591-2.195-10.594-6.863-13.306zm-3.137-2.945c.552 0 1 .449 1 1 0 .552-.448 1-1 1s-1-.448-1-1c0-.551.448-1 1-1zm3 20c0 1.598-1.392 3-2.971 3s-3.029-1.402-3.029-3h6zm5.015-12.521c-.246-1.504-.933-3.682-2.817-5.515l1.396-1.434c1.8 1.752 2.974 4.044 3.395 6.626l-1.974.323zm-18.015-.322c.421-2.583 1.595-4.874 3.395-6.627l1.396 1.434c-1.884 1.833-2.572 4.011-2.817 5.515l-1.974-.322z"/></svg>
          {
            (props.num != 4 && props.num != 5)&&
            <>
              <h2>
              <Link href={"/create"}>
                  Create Post
                </Link>
              </h2>
              <h2>
                <Link href={"/setting"}>
                  Setting
                </Link>
              </h2>
            </>
          }
          
          {
            props.num == 4 &&
            <>
              <h2 className={scss.active}>
              <Link href={"/create"} > 
                  Create Post
                </Link>
              </h2>
              <h2>
                <Link href={"/setting"}>
                  Setting
                </Link>
              </h2>
            </>
          }

          {
            props.num == 5 &&
            <>
              <h2>
              <Link href={"/create"}> 
                  Create Post
                </Link>
              </h2>
              <h2 className={scss.active}>
                <Link href={"/setting"}>
                  Setting
                </Link>
              </h2>
            </>
          }
          
        </div>
      </div>
    </section>
  )
}

export default Nav