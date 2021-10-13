import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@ui-kitten/components';
import { openscreen } from '../../utils';

const SearchInput = () => {
  const navigation = useNavigation();
  const [input, setInput] = React.useState<string>('');

  // The search text field submit and routing handler
  const submitHandler = () => {
    if (input.trim().length !== 0) {
      openscreen({
        navigation: navigation,
        screenName: 'Search',
        params: { key: input },
      });
    }
  };

  return(
    <>
      <TextInput
        blurOnSubmit={false}
        placeholder='搜一搜'
        style={styles.inputField}
        onSubmitEditing={submitHandler}
        onChangeText={e => setInput(e)}
        value={input}
      />
      <View style={styles.iconContainer}>
        <Icon name='search-outline' fill='#c4c4c4' style={styles.icon}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  inputField: {
    flex: 1,
    height: 30,
    backgroundColor: '#fff',
    color: 'black',
    paddingLeft: 28,
    borderRadius: 5,
    borderColor: '#f0f0f0',
    borderWidth: 1,
  },
});

export default SearchInput;
