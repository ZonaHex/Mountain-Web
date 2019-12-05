package com.web.service;

import com.web.dao.MountainsDAO;
import com.web.pojo.record.MountainsRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class MountainService {
    private final MountainsDAO mountainsDAO;

    @Autowired
    public MountainService(MountainsDAO mountainDAO) {
        this.mountainsDAO = mountainDAO;
    }
    public List<MountainsRecord> loadSome() {
        ArrayList<MountainsRecord> records = new ArrayList<>();
        ArrayList<Integer> randomMountainList = new ArrayList<>(); //Mountain
        while (randomMountainList.size()<3){
            Random ra =new Random();
            int id = ra.nextInt(98) + 1;
            while (randomMountainList.contains(id)){
                id = ra.nextInt(98) + 1;
            }
            randomMountainList.add(id);
        }
        for (int i = 0 ; i < randomMountainList.size() ; i++){
            List<MountainsRecord> mountainsRecords = mountainsDAO.loadOne(randomMountainList.get(i));
            Random r =new Random();
            int p = r.nextInt(mountainsRecords.size());
            records.add(mountainsRecords.get(p));
        }
        return records;
    }

}
