import React, { useState } from 'react';
import Header from './header';
import MyFeed from './MyFeed';
import OtherFeed from './OtherFeed';

const Dashboard = () => {
    const [tab, setTab] = useState('myFeed');
    return (
        <div>
            <Header tab={tab} setTab={setTab}/>
            {
                tab==='myFeed' ? <MyFeed/> : <OtherFeed/>
            }
        </div>
    );
}

export default Dashboard;
