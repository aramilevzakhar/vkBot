let tablename = 'status_people';


let senteins = [
    {1: {"とけいのしゅりはいつできますか": "時計の修理は何時できますか"}},
    {2: {"しんじゅくでいまくろさわのえいががみられます": "新宿で今黒沢の映画が見られます"}},
    {3: {"しんかんせんからふしさんがみえます": "新幹線から富士山が見えます"}},
    {4: {"わたしのへやからうみがみえます": "私の部屋から海が見えます"}},
    {5: {"おとうとのへやからもみえます": "弟の部屋からも見えます"}},
    {6: {"ローマじしかかけません": "ローマ字しか書けません"}},
    {7: {"ローマじだけかけます": "ローマ字だけ書けます"}}
];


// export let request_insert = `
//     insert into ${tablename} (
//         firstname, 
//         lastname, 
//         id_page, 
//         screenname,
//         status,
//         sex
//     ) values (
//         '${firstname}', 
//         '${lastname}', 
//         ${id_page}, 
//         '${screenname}',
//         '${user_status}',
//         ${sex}
//     );`;
// export let request_update = `update ${tablename} 
//     set sex=${sex} 
//     where id_page=${id_page};`;
// export let request_select = `select status 
//     from ${tablename} 
//     where id = (SELECT floor(random()*(select COUNT(*) from ${tablename}))+1)`;
    
// export default request_insert;
// export default request_update;
// export default request_select;
