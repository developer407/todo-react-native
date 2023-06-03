/* eslint-disable space-infix-ops */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState,useEffect} from 'react';
import {TaskCard} from '../TaskCard';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../Redux/Auth/Action';
import { getAllTasks } from '../../Redux/Task/Action';


const TodaysTask = () => {
  const [selectedPriority, setSelectedPriority] = useState('all');
  const {task,auth} = useSelector(store => store);
  const dispatch=useDispatch();

  const handleSelectPriority = priority => {
    setSelectedPriority(priority);
  };

  useEffect(() => {
    const getUserProfileData = async () => {
      const jwt = await getData("jwt");
      console.log(jwt);
      if (jwt) {
        dispatch(getUserProfile(jwt));
      }

      console.log('jwt async storate ', jwt);
    };

    getUserProfileData();
    dispatch(getAllTasks());

    console.log('--------------');
  }, []);


  return (
    <View style={styles.container}>
      <View>
        {/* <Text style={styles.sortHeading}>SORT TASK</Text> */}
        <Text style={styles.heading}>Todays Task</Text>
        <View style={styles.priorityContainer}>
          <TouchableOpacity
            onPress={() => handleSelectPriority('all')}
            style={[styles.button,{
              backgroundColor:
                selectedPriority === 'all' ? '#120E43' : 'white',
            }]}>
            <Text style={[styles.allPrioity, styles.priorityText,{color: selectedPriority === 'all' ? 'white' : '#120E43'}]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectPriority('high')}
            style={[
              styles.button,
              {
                backgroundColor:
                  selectedPriority === 'high' ? '#00D84A' : 'white',
              },
            ]}>
            <Text
              style={[
                styles.highPriority,
                styles.priorityText,
                {color: selectedPriority === 'high' ? 'white' : '#00D84A'},
              ]}>
              High
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectPriority('medium')}
            style={[
              styles.button,
              {
                backgroundColor:
                  selectedPriority === 'medium' ? '#F4BE2C' : 'white',
              },
            ]}>
            <Text
              style={[
                styles.mediumPriority,
                styles.priorityText,
                {color: selectedPriority === 'medium' ? 'white' : '#F4BE2C'},
              ]}>
              Medium
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSelectPriority('low')}
            style={[
              styles.button,
              {
                backgroundColor:
                  selectedPriority === 'low' ? '#FF6263' : 'white',
              },
            ]}>
            <Text
              style={[
                styles.lowPriority,
                styles.priorityText,
                {color: selectedPriority === 'low' ? 'white' : '#FF6263'},
              ]}>
              Low
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <Text style={styles.heading}>Todays Task</Text> */}

      <View>
        {task.tasks.map((item, index) => (
          <TaskCard key={20 + index} item={item} type={item.status} />
        ))}
      </View>
    </View>
  );
};

export default TodaysTask;

const styles = StyleSheet.create({
  sortHeading: {
    fontSize: 20,
    color: 'black',
    marginTop:10,
    marginBottom:5
  },
  priorityContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  priorityText: {
    fontSize: 17,
  },
  highPriority: {
    color: '#00D84A',
  },
  mediumPriority: {
    color: '#F4BE2C',
  },
  lowPriority: {
    color: '#FF6263',
  },
  allPrioity: {
    color: '#120E43',
  },
  container: {
    marginHorizontal: 10,
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  low: {},
});
