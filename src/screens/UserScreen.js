import { View,Text,StyleSheet,FlatList,ActivityIndicator, TouchableOpacity } from "react-native";
import { useQuery, useMutation, Mutation } from "@tanstack/react-query";
import { getUsers } from "../api/api";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const {data,isLoading,isError,error,isFetching,refetch} = useQuery({
        queryKey:['users'],
        queryFn: getUsers
    })

    if(isLoading){
        return(
            <View style={styles.container}>
                <ActivityIndicator size={'large'}/ >
                <Text>Carregando usuário {}...</Text>
            </View>
        )
    }

    if(isError){
        return(
            <View style={styles.container}>
                <Text style={{fontWeight:'bold', color:'red'}}>Erro ao cerregar usuários</Text>
                <Text>Erro: {error.message}</Text>
            </View>
        )
    }
  return (
    <SafeAreaView>
        <View style={[styles.linha, styles.cabecalho]}>
            <Text style={styles.celula}>Nome</Text>
            <Text style={styles.celula}>E-Mail</Text>
        </View>
        <FlatList
            data={data}
            refreshing={isFetching}
            onRefresh={refetch}
            renderItem={({item})=>(
                <TouchableOpacity style={{}}>
                    <View style={styles.linha}>
                        <Text style={styles.celula}>{item.name}</Text>
                        <Text style={styles.celula}>{item.email}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />

        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    linha: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    cabecalho: {
        backgroundColor: '#f2f2f2'
    },
    celula: {
        flex: 1,
        padding: 10,
        textAlign: 'center'
    }
})