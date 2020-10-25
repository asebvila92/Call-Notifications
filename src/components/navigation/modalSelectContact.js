import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Overlay, SearchBar, Button} from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import ViewIsLoading from '../layout/viewIsLoading'

export default function SelectContact(props) {
  const { visible, onChangeVisibility, onSelectContact } = props;
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(false);
  const [searchedContact, setSearchedContact] = useState('');

  useEffect(() => {
    if(visible){
      (async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
          setIsLoadingContacts(true);
          const { data } = await Contacts.getContactsAsync({
            fields: [Contacts.Fields.Name, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
          });
          setIsLoadingContacts(false);
          setFilteredContacts(data)
          setContacts(data);
        }
      })()
    }
  },[visible])

  function findAContact(wordInput) {
    setSearchedContact(wordInput);
    let filteredContacts = contacts.filter((contact) => (contact.name.toLowerCase().indexOf(wordInput.toLowerCase()) >= 0));
    setFilteredContacts(filteredContacts);
  }

  function handleSelectContact(name, phone) {
    let formatedPhone = phone.replace(/ /g, '');
    formatedPhone = formatedPhone.replace('+598','0');
    setSearchedContact('');
    onSelectContact(name, formatedPhone);
  }

  return (
    <Overlay overlayStyle={styles.container} isVisible={visible} onBackdropPress={() => onChangeVisibility(false)}>
      <View style={styles.content}>
        <View style={styles.vwTitle}>
          <Text style={styles.title}>Selecciona un Contacto</Text>
          <Button title='Cerrar' type='clear' disabled={isLoadingContacts} onPress={() => onChangeVisibility(false)} />
        </View>
        <SearchBar 
          platform='ios' 
          placeholder="Buscar..."
          round={true}
          showCancel={false}
          inputContainerStyle={{maxHeight: 50, minHeight: 40}}
          inputStyle={{fontSize: 12, maxHeight: 10}}
          cancelButtonProps={{buttonTextStyle:{fontSize: 12}}}
          value={searchedContact}
          onChangeText={(text) => findAContact(text)} 
        />
        {
          !isLoadingContacts ?
            <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps='always'>
              {
                filteredContacts && filteredContacts.map((c, i) => c.phoneNumbers?.length > 0 && c.name && (
                  <TouchableOpacity style={styles.rowContact} key={i} onPress={()=> handleSelectContact(c.name, c.phoneNumbers[0].number) }>
                    <Text style={styles.txtName}>{c.name}</Text>
                    <Text style={styles.txtPhone}>{c.phoneNumbers[0].number}</Text>
                  </TouchableOpacity>
                )) 
              }
            </ScrollView>
          :
            <ViewIsLoading />
        } 
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: '#f4f5fa',
  },
  content: {
    padding: 5,
    maxHeight: 550,
    minHeight: 550,
  },
  vwTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  vwModalOption: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15
  },
  rowContact: {
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#a9a9a9'
  },
  txtName: {
    color: '#4d4f5c',
    fontWeight: '700',
  },
  txtPhone: {
    color: '#4d4f5c',
    fontSize: 12
  }
});