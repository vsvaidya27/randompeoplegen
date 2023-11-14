import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Person {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  picture: {
    medium: string;
  };
  dob: {
    date: string;
    age: number;
  };
  email: string;
  phone: string;
  cell: string;
  nat: string;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const FetchRandomUsers = () => {
  const [person, setPerson] = useState<Person[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        setPerson(data.results);
      } catch (err) {
        console.error('Error fetching data: ', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
    {person.map((person, index) => (
    <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          <Item>
            <Avatar>
                <AvatarImage src={person.picture.medium} alt={`${person.name.first} ${person.name.last}`} style={{ width: '50%' }} />
            </Avatar>
          <Dialog>
            <DialogTrigger>
            {`${person.name.title} ${person.name.first} ${person.name.last}`}
            </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Want to learn more about this person?</DialogTitle>
                  <DialogDescription>
                    {`${person.name.title} ${person.name.first} ${person.name.last}`}
                    <br></br>
                    {person.email}
                    <br></br>
                    {`${person.location.street.number} ${person.location.street.name} ${person.location.city} ${person.location.state} ${person.location.country}`}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> 
           <p>Email: {person.email}</p>
           <p>Phone: {person.phone}</p>
           <p>Age: {person.dob.age}</p>
          </Item>
        </Grid>
      </Grid>
    </Box>
    </div>
  ))}
  </div>
    // <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
    //   {person.map((person, index) => (
    //     <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
    //       <img src={person.picture.medium} alt={`${person.name.first} ${person.name.last}`} style={{ width: '50%' }} />
    //       <h3>{`${person.name.title} ${person.name.first} ${person.name.last}`}</h3>
    //       <p>Email: {person.email}</p>
    //       <p>Phone: {person.phone}</p>
    //       <p>Age: {person.dob.age}</p>
    //     </div>
    //   ))}
    // </div>
  );
};

export default FetchRandomUsers;

/*
import internal from "stream";

async function fetchData() {
  const response = await fetch('https://randomuser.me/api/?results=10')
  const users = await response.json()
  return users
}

export default function Home() {
  const people = fetchData()
  console.log(people)
  return (
    <>
    
    </>
  )
}

type ResultsArray = {
  results: Result[],
  info: Info
};

interface Result {
  gender: string,
  name: Name,
  location: Location,
  email: string,
  login: Login,
  dob: DOB,
  registered: Registered,
  phone: string,
  cell: string,
  id: ID,
  picture: Picture,
  nat: string
}

interface Name {
  title: string,
  first: string,
  last: string
}

interface Street {
  number: number,
  name: string
}

interface Location {
  street: Street,
  city: string,
  state: string,
  country: string,
  postcode: string,
  coordinates: Coordinates,
  timezone: Timezone
}

interface Coordinates {
  latitude: string,
  longitude: string
}

interface Timezone {
  offset: string,
  description: string
}

interface Login {
  uuid: string,
  username: string,
  password: string,
  salt: string,
  md5: string,
  sha1: string,
  sha256: string
}

interface DOB {
  date: string,
  age: number
}

interface Registered {
  date: string,
  age: number
}

interface ID {
  name: string,
  value: string
}

interface Picture {
  large: string,
  medium: string,
  thumbnail: string
}

interface Info {
  seed: string,
  results: number,
  page: number,
  version: string
}
*/