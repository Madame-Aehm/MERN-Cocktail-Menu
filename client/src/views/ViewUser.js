import React, { useContext, useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate, useParams } from 'react-router-dom';
import UserPlainView from '../components/UserPlainView';
import UserRecipes from '../components/UserRecipes';
import useSingleUserFetch from '../hooks/useSingleUserFetch';
import { AuthContext } from '../context/AuthContext.js'
import Fade from 'react-bootstrap/Fade';
import PageLoader from '../components/PageLoader';

function ViewUser() {
  const redirect = useNavigate();
  const { user } = useContext(AuthContext);
  const { _id } = useParams();
  const { userToView, loading, error } = useSingleUserFetch(_id);
  const [mount, setMount] = useState(false);

  const plainDisplay = {
    display: "flex"
  }

  function profileRedirect() {
    if (user && (_id === user._id)) {
          redirect("/my-profile", {replace: true});
        }
  }
  useEffect(() => {
    profileRedirect();
    setMount(true);
  }, [])
 

  return (
    <Fade in={mount}>
      <div className='simple-display p-0'>
        {loading && <PageLoader />}
        {userToView.error && <p>{userToView.error}</p>}
        {error && <p>Something went wrong: {error}</p>}
        {(!error && userToView.username) && <>
          <h1 className='page-title'>{userToView.username}'s Profile</h1>
          <div style={{width: "100%"}}>
            <Tabs
              defaultActiveKey="account"
              id="uncontrolled-tab-example"
              className="mb-3"
              justify>

              <Tab eventKey="account" title="Account">
                <h4 className='sub-title' style={{textAlign: "center"}}>Account Details</h4>
                <div className='simple-display'>
                  <UserPlainView userToView={userToView} display={plainDisplay} />
                </div>
              </Tab>

              <Tab eventKey="recipes" title="Recipes" className='test'>
                <UserRecipes userToView={userToView} filter={"posted"} />
              </Tab>

              <Tab eventKey="favourites" title="Favourites">
              <UserRecipes userToView={userToView} filter={"favourites"} />
              </Tab>
            </Tabs>
          </div>
        </>}
      </div>
    </Fade>
    
  )
}

export default ViewUser