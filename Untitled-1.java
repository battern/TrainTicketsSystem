    @GetMapping(value="/GetOrder")
    public List GetOrder(@RequestParam String Uno,@RequestParam int otype){
        List<Map<String,Object>> list=null;
        String view=null;
        switch (otype){
            case 1:
                view="OOrder"; break;
            case 2:
                view="POrder";break;
            case 3:
                view="ROrder";break;
            default:
                view="_Order";break;
        }
        list=template.queryForList("SELECT * FROM "+view+" WHERE Uno='"+Uno+"' ORDER BY otime DESC");
        for(Map e:list){
            short sSorder_c=(short)e.get("sSorder_c");
            short eSorder_c=(short)e.get("eSorder_c");
            String sdate=e.get("sdate").toString();
            String Tno_c=(String)e.get("Tno_c");
            String sSname=(String)template.queryForMap("SELECT Sname_c FROM _TSS WHERE " +
                    "sdate='"+sdate+"' AND Tno_c='"+Tno_c+"' AND sSorder_c="+Short.toString(sSorder_c)).get("Sname_c");
            String eSname=(String)template.queryForMap("SELECT Sname_c FROM _TSS WHERE " +
                    "sdate='"+sdate+"' AND Tno_c='"+Tno_c+"' AND sSorder_c="+Short.toString(eSorder_c)).get("Sname_c");
            e.put("sSname",sSname);
            e.put("eSname",eSname);
            e.put("otime",Alg.date2format(((Timestamp)e.get("otime")).toString()));
            switch (otype){
                case 3:
                    e.put("rtime",Alg.date2format(((Timestamp)e.get("rtime")).toString()));
                case 2:
                    e.put("ptime",Alg.date2format(((Timestamp)e.get("ptime")).toString()));break;
            }
            e.put("sdtime",Alg.date2format(((Timestamp)e.get("sdtime")).toString()));
            e.put("eatime",Alg.date2format(((Timestamp)e.get("eatime")).toString()));
        }
        return list;
    }