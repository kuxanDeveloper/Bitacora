import React from 'react'

function ForgotPassword() {
  return (
    <div>ForgotPassword</div>
  )
}

export default ForgotPassword

export async function getStaticProps() {
    return {
      props: {
        path: null,
      },
      revalidate: 3600,
    };
  }