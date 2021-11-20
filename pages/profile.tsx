import Navbar from '../components/Navbar/Navbar';
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image';

function Profile() {
  const { user, isLoading }: any = useUser();
  console.log(user);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Image
          src="/loading.svg"
          alt="Loading Spinner"
          height="300"
          width="300"
        />
      ) : user ? (
        <>
          <div style={{ textAlign: 'center' }}>
            <h1>Your profile</h1>
            <Image
              src={user.picture}
              alt="your profile picture"
              width={150}
              height={150}
            />
            <h2>
              <span>Name: </span>
              {user.given_name || user.name}
            </h2>
            <h2>
              <span>Email: </span>
              {user.email}
            </h2>
          </div>
        </>
      ) : (
        <>
          <Navbar />
          <h1 style={{ textAlign: 'center' }}>You need to log in</h1>
        </>
      )}
    </>
  );
}

export default Profile;
