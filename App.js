import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

const files = [
  {
    name: 'IRPG.pdf',
    url: 'https://www.nwcg.gov/sites/default/files/publications/pms461.pdf',
  },
  {
    name: 'IRPG1.pdf',
    url: 'https://www.nwcg.gov/sites/default/files/publications/pms461.pdf',
  },
  {
    name: 'IRPG2.pdf',
    url: 'https://www.nwcg.gov/sites/default/files/publications/pms461.pdf',
  },
];

export default function App() {
  const [downloadedFiles, setDownloadedUrls] = useState([]);
  const [downloading, setDownloading] = useState(false);

  const makeDownload = (file) => {
    const { name, url } = file;
    const dest = FileSystem.documentDirectory + name;

    setDownloading(true);
    FileSystem.downloadAsync(
      url,
      dest,
    )
    .then(({ uri }) => {
      setDownloadedUrls([...downloadedFiles, { name, uri }]);
      setDownloading(false);
    })
    .catch(error => {
      setDownloading(false);
      console.log(error);
    });
  }

  const openFile = async (uri) => {
    try {
      const cUri = await FileSystem.getContentUriAsync(uri);

      await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
        type: "application/pdf",
      });
    }catch(e){
        console.log(e.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.sectionTitle}>
        <Text style={styles.text}>
          PDF list which you can download
        </Text>
      </View>
      {!!files.length ? (
        files.map((file, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.pdfName}>{file.name}</Text>
            <Button title='Download' onPress={() => makeDownload(file)} />
          </View>
        ))
      ) : (
        <Text style={styles.pdfName}>
          There is no pdf.
        </Text>
      )}

      <View style={styles.sectionTitle}>
        <Text style={styles.pdfName}>
          {downloading ? 'Downloading ...' : ''}
        </Text>
      </View>

      <View style={styles.sectionTitle}>
        <Text style={styles.text}>
          Downloaded PDF list
        </Text>
      </View>
      {!!downloadedFiles.length ? (
        downloadedFiles.map((file, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.pdfName}>{file.name}</Text>
            <Button title='Open' onPress={() => openFile(file.uri)} />
          </View>
        ))
      ): (
        <Text style={styles.pdfName}>
          There is no downloaded pdf.
        </Text>
      )}
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#000',
    fontSize: 25,
    textAlign: 'center',
  },
  pdfName: {
    color: '#000',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
});

