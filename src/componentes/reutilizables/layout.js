import React from 'react';

const Layout  = ({ children, h_center }) => {    
    return (
    <>
        <main>
            <div class="container-fluid f-screen bg-light">
                <div class={h_center===true?"row justify-content-center align-items-center h-100 overflowed":"row justify-content-center h-100 overflowed"}>
                    <div class="col col-xl-3 col-lg-8 col-md-8 col-sm-5 m-3" align-v="center">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    </>     
    )
}
export default Layout
