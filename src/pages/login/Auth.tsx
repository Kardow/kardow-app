import { useState } from 'react'
import { supabase } from '../../client'

import { Auth as AuthSupabase, Typography, Button } from '@supabase/ui'

const Container = (props: any) => {
  props.user = AuthSupabase.useUser();
  console.log(props.user);
  if (props.user)
    return (
      <div style={{width: '60%', marginLeft: '20%'}}>
        <Typography.Text>Signed in: {props.user.email}</Typography.Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </div>
    )
  return props.children
}

export default function Auth(props: any) {
  return (
    <div style={{width: '30%', marginLeft: '35%', marginTop: '10%'}}>
      <AuthSupabase.UserContextProvider supabaseClient={supabase}>
        <Container supabaseClient={supabase} user={props.user}>
          <AuthSupabase redirectTo='http://localhost:3000/project/ba5a6c4b-1952-414c-8c53-52f4299e01c1' supabaseClient={supabase} providers={['google', 'github', 'gitlab', 'discord']} />
        </Container>
      </AuthSupabase.UserContextProvider>
    </div>
  )
}